import { NextResponse } from 'next/server';
import { spawn } from 'child_process';
import path from 'path';

export const dynamic = 'force-dynamic';

export async function POST(request) {
  try {
    if (request.method !== 'POST') {
      return NextResponse.json(
        { error: 'Method not allowed' },
        { status: 405 }
      );
    }

    const { query } = await request.json();
    
    const scriptPath = '/Users/prueba/Desktop/pokecun-1/agente/agentes.py';
    
    const pythonProcess = spawn('python', [scriptPath, query], {
      cwd: path.dirname(scriptPath),
      env: {
        ...process.env,
        PYTHONUNBUFFERED: '1',
        PYTHONIOENCODING: 'utf-8'
      }
    });
    
    let output = '';
    let errorOutput = '';
    
    pythonProcess.stdout.on('data', (data) => {
      output += data.toString();
    });
    
    pythonProcess.stderr.on('data', (data) => {
      errorOutput += data.toString();
    });
    
    const exitCode = await new Promise((resolve) => {
      pythonProcess.on('close', resolve);
    });
    
    // Limpiar la salida para obtener solo el JSON válido
    const jsonStart = output.indexOf('{');
    const jsonEnd = output.lastIndexOf('}') + 1;
    const jsonString = jsonStart !== -1 && jsonEnd !== -1 ? output.slice(jsonStart, jsonEnd) : output;
    
    try {
      const result = JSON.parse(jsonString);
      
      if (result.error) {
        throw new Error(result.error);
      }
      
      return NextResponse.json(result);
    } catch (parseError) {
      console.error('JSON parse error:', parseError);
      console.error('Raw output:', output);
      throw new Error(`Invalid JSON from Python. Output was: ${jsonString}`);
    }
    
  } catch (error) {
    console.error('API route error:', error);
    return NextResponse.json(
      { 
        error: error.message || 'Internal server error',
        details: process.env.NODE_ENV === 'development' ? {
          stack: error.stack
        } : null
      },
      { status: 500 }
    );
  }
}