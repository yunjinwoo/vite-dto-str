import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";

export interface WordDefinition {
  word: string;
  phonetic?: string;
  phonetics: Array<{
    text?: string;
    audio?: string;
  }>;
  meanings: Array<{
    partOfSpeech: string;
    definitions: Array<{
      definition: string;
      example?: string;
      synonyms?: string[];
      antonyms?: string[];
    }>;
  }>;
}

export const fetchWordDefinition = async (word: string): Promise<WordDefinition> => {
  try {
    const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
    if (!response.ok) {
      throw new Error('Word not found');
    }
    const data = await response.json();
    return data[0];
  } catch (error) {
    console.error('Error fetching word definition:', error);
    throw error;
  }
};



/* 
export const useMutateWordDefinition = () => {
  return useMutation(async ({ word }: { word: string }) => {
    const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
    if (!response.ok) {
      throw new Error('Word not found');
    }
    return response.json();
  });
};
 */