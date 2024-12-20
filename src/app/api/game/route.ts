import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabaseClient'

export async function POST(request: Request) {
  try {
    const { roomId, action, data } = await request.json()

    let gameState

    switch (action) {
      case 'create':
        const { data: newGame, error: createError } = await supabase
          .from('games')
          .insert({ room_id: roomId, game_state: data })
          .select()
          .single()

        if (createError) {
          console.error('Create error:', createError)
          return NextResponse.json({ error: createError.message }, { status: 500 })
        }
        gameState = newGame.game_state
        break

      case 'update':
        const { data: updatedGame, error: updateError } = await supabase
          .from('games')
          .update({ game_state: data })
          .eq('room_id', roomId)
          .select()
          .single()

        if (updateError) {
          console.error('Update error:', updateError)
          return NextResponse.json({ error: updateError.message }, { status: 500 })
        }
        gameState = updatedGame.game_state
        break

      case 'get':
        const { data: game, error: getError } = await supabase
          .from('games')
          .select('game_state')
          .eq('room_id', roomId)
          .single()

        if (getError) {
          console.error('Get error:', getError)
          return NextResponse.json({ error: getError.message }, { status: 500 })
        }
        gameState = game.game_state
        break

      default:
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
    }

    return NextResponse.json({ gameState })
  } catch (error) {
    console.error('Unhandled error:', error)
    return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 })
  }
}
