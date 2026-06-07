// lib/indexnow.ts

const INDEXNOW_API = 'https://api.indexnow.org/indexnow';
const IS_DEVELOPMENT = process.env.NODE_ENV === 'development';

export async function sendIndexNowPing(url: string, key: string) {
  // Skip actual ping in development
  if (IS_DEVELOPMENT) {
    console.log(`🔁 [DEV] Would ping IndexNow for: ${url}`);
    console.log(`🔑 [DEV] Using key: ${key.substring(0, 10)}...`);
    return true; // Mock success
  }
  
  try {
    const fullUrl = `${INDEXNOW_API}?url=${encodeURIComponent(url)}&key=${key}`;
    
    const response = await fetch(fullUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (response.ok) {
      console.log(`✅ IndexNow ping sent for: ${url}`);
      return true;
    } else {
      console.log(`❌ IndexNow failed for: ${url}`, response.status);
      return false;
    }
  } catch (error) {
    console.error('IndexNow error:', error);
    return false;
  }
}