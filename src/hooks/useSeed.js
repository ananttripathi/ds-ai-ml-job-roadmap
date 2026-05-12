import { useEffect, useRef } from 'react'
import { supabase } from '@/lib/supabase'
import { DEFAULT_TOPICS, DEFAULT_CATEGORIES } from '@/lib/constants'

export function useSeed(userId) {
  const seeded = useRef(false)

  useEffect(() => {
    if (!userId || seeded.current) return
    seeded.current = true

    async function seed() {
      // Fetch which course_ids the user already has topics for
      const { data: existing } = await supabase
        .from('topics')
        .select('course_id')
        .eq('user_id', userId)

      const seededCourseIds = new Set((existing || []).map(t => t.course_id))

      // Only insert topics for courses the user has none of yet
      const missing = DEFAULT_TOPICS.filter(t => !seededCourseIds.has(t.course_id))
      if (missing.length > 0) {
        const topicsWithUser = missing.map(t => ({
          ...t,
          user_id: userId,
          status: 'not_started',
        }))
        await supabase.from('topics').insert(topicsWithUser)
      }

      // Check if user already has categories
      const { count: catCount } = await supabase
        .from('goal_categories')
        .select('id', { count: 'exact', head: true })
        .eq('user_id', userId)

      if (catCount === 0) {
        const catsWithUser = DEFAULT_CATEGORIES.map(c => ({
          ...c,
          user_id: userId,
        }))
        await supabase.from('goal_categories').insert(catsWithUser)
      }
    }

    seed()
  }, [userId])
}
