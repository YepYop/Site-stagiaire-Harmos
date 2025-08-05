import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    // Mock analysis logic - in a real app, this would be more sophisticated
    let score = 50; // Base score
    
    // Analyze personality (20 points)
    if (data.personality === 'leader') score += 20;
    else if (data.personality === 'strategist') score += 15;
    else if (data.personality === 'firefighter') score += 10;
    
    // Analyze scenario choice (15 points)
    if (data.scenario === 'negotiate') score += 15;
    else if (data.scenario === 'refuse') score += 10;
    else if (data.scenario === 'accept') score += 5;
    
    // Analyze tech stack (15 points)
    const techStack = data.techStack || [];
    if (techStack.includes('ts')) score += 5;
    if (techStack.includes('js')) score += 3;
    if (techStack.includes('aiml')) score += 7;
    if (techStack.length >= 3) score += 5;
    
    // Bonus for GitHub URL (5 points)
    if (data.githubUrl && data.githubUrl.includes('github.com')) {
      score += 5;
    }
    
    // Bonus for music taste (5 points) - if they provided 3 songs
    if (data.songs && data.songs.length === 3) {
      score += 5;
    }
    
    // Cap the score at 100
    score = Math.min(score, 100);
    
    // Add some randomness for realism
    score += Math.floor(Math.random() * 10) - 5;
    score = Math.max(0, Math.min(100, score));
    
    return NextResponse.json({ 
      score,
      message: 'Analysis complete',
      breakdown: {
        personality: data.personality,
        scenario: data.scenario,
        techStack: techStack.length,
        hasGithub: !!data.githubUrl,
        songCount: data.songs?.length || 0
      }
    });
  } catch (error) {
    console.error('Analysis error:', error);
    return NextResponse.json(
      { error: 'Failed to analyze responses' },
      { status: 500 }
    );
  }
}