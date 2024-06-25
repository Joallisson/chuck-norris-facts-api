import * as deepl from 'deepl-node';

type PropsType = {
    jokeText: string
    targetLang?: string
}

export class TranslatorFactsService{

    async translateJoke({jokeText, targetLang = 'pt-BR'}: PropsType): Promise<String> {
        try {
            const authKey = process.env.DEEPL_KEY;
            const translator = new deepl.Translator(authKey);

            const result = await translator.translateText(jokeText, 'en', targetLang as any);
            return result.text  
            
        } catch (error) {
            console.error('Error translating text:', error);
            return "Translation error";
        }
    }
}