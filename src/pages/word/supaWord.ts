import { supabase } from "@features/supabase";


export async function getAvailableWords(limit_count:number=15): Promise<{ word: string, word_info: any }[]> {
    /*  const { data, error } = await supabase
         .from('words')
         .select('word,word_info')
         // used_at이 null 이거나 7일 이상 지난 것
         .or(`used_at.is.null,used_at.lte.${new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()}`)
         //.order('random()') // 무작위 정렬
         //.lte('used_at', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString())
         .limit(20); // 20개만 가져오기 */

    let { data, error } = await supabase
        .rpc('get_random_words', {
            limit_count
        })
    if (!data && error && !Array.isArray(data)) throw error;
    return data?.map((row: any) => ({
        word: row?.word,
        word_info: row?.word_info
    })) ?? [];
}

export async function updateWordInfo(word: string, info: any) {
    const { data, error } = await supabase
        .from('words')
        .update({
            word_info: info,
            //word_info: JSON.parse(JSON.stringify(info)),
            updated_at: new Date().toISOString()
        }) // info는 객체(JSON)
        .eq('word', word); // 해당 단어에만 업데이트

    if (error) {
        console.error('업데이트 실패:', error);
    } else {
        console.log('업데이트 완료:', data);
    }
}