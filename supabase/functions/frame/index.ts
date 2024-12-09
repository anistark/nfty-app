import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { buttonIndex, inputText } = await req.json()

    // Create Supabase client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? ''
    )

    // Log frame interaction
    await supabaseClient
      .from('activity_logs')
      .insert({
        action_type: 'frame_interaction',
        details: {
          buttonIndex,
          inputText,
          timestamp: new Date().toISOString(),
        },
      })

    // Return the next frame
    return new Response(
      JSON.stringify({
        image: `${req.headers.get('origin')}/images/punk.jpeg`,
        buttons: [
          {
            label: 'Visit NFTy 500',
            action: 'link',
            target: `${req.headers.get('origin')}/synth-token`,
          },
        ],
      }),
      {
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    )
  } catch (error) {
    console.error('Error:', error)
    return new Response(
      JSON.stringify({ error: 'Internal Server Error' }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    )
  }
})