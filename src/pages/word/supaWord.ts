import { supabase } from "@features/supabase";


export async function getAvailableWords(from: number = 1, to: number = 1): Promise<{ word: string, word_info: any }[]> {
    const { data, error } = await supabase
        .rpc('get_random_words', {
            p_limit: to - from + 1,
            p_offset: from - 1
        });

    if (error) {
        console.error('Error getting available words:', error);
        return [];
    }

    if (!data || !Array.isArray(data)) {
        console.error('Invalid data format:', data);
        return [];
    }

    return data.map((row: any) => ({
        word: row?.word,
        word_info: row?.word_info
    }));
}


export async function getWordsInfo(from: number = 1, to: number = 1): Promise<{ word: string, word_info2: any }[]> {
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    const { data, error } = await supabase
        .from('words')
        .select('word, word_info2')
        .or(`used_at.is.null,used_at.lte.${oneWeekAgo.toISOString()}`)
        .order('word', { ascending: true })
        .range(from, to);
    console.log('getWordsInfo data error', error);
    if( !data ) return [];
    return data;
}

export async function getTotalWordCount(): Promise<number> {
    const { count, error } = await supabase
        .from('words')
        .select('*', { count: 'exact', head: true });
    
    if (error) {
        console.error('Error getting total word count:', error);
        return 0;
    }
    return count || 0;
}

export async function getWordsByPage(page: number, itemsPerPage: number = 10): Promise<{ word: string, word_info2: any }[]> {
    const from = (page - 1) * itemsPerPage;
    const to = from + itemsPerPage - 1;
    return getWordsInfo(from, to);
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

export async function getWordsWithInfo(from: number = 1, to: number = 1): Promise<{ word: string, word_info: any }[]> {
    const { data, error } = await supabase
        .from('words')
        .select('word, word_info')
        .not('word_info', 'is', null)
        .order('word', { ascending: true })
        .range(from - 1, to - 1);

    if (error) {
        console.error('Error getting words with info:', error);
        return [];
    }

    if (!data || !Array.isArray(data)) {
        console.error('Invalid data format:', data);
        return [];
    }

    return data.map((row: any) => ({
        word: row?.word,
        word_info: row?.word_info
    }));
}

export async function getWordsWithInfoCount(): Promise<number> {
    const { count, error } = await supabase
        .from('words')
        .select('*', { count: 'exact', head: true })
        .not('word_info', 'is', null);

    if (error) {
        console.error('Error getting words with info count:', error);
        return 0;
    }
    return count || 0;
}