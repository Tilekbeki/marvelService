class MarvelService {

    _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    _apiKey = 'apikey=27b60328c00c946546468ac816a3a0a2';
    _baseOffset = 210;

    getResource = async (url) => {
        let res = await fetch(url);

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }

        return await res.json();
    }

    getAllCharacters = async(offset = this._baseOffset) => {
        const res = await this.getResource(`${this._apiBase}characters?limit=9&offset=${offset}&${this._apiKey}`);
        return res.data.results.map(this._transformCharacter);
    }

    getCharacter = async(id) => {
        const res = await this.getResource(`${this._apiBase}characters/${id}?${this._apiKey}`)
        return this._transformCharacter(res.data.results[0]);
    }

    _transformCharacter = (char) => {
        if(char.description.length <=1) {
            char.description = 'Character data is unknown';
        }
        if(char.description.length>=200) {
            char.description = char.description.slice(0,201)+'...'
        }
        return {
            id: char.id,
            name: char.name,
            description: char.description,
            thumbnail: char.thumbnail.path+'.'+char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            comics: char.comics.items
        }
    }
}

export default MarvelService;

// Этот код представляет собой класс MarvelService, который используется для получения информации о персонажах Marvel из API. 

// У класса есть три метода: 

// 1. getResource - метод, который делает запрос к API и возвращает результат в формате JSON. Если запрос не удался, метод выбрасывает ошибку.

// 2. getAllCharacters - метод, который использует getResource для получения информации о всех персонажах Marvel. Он ограничивает количество персонажей, возвращаемых API, до 9 и начинает с 210-го персонажа. Затем он использует метод _transformCharacter для преобразования полученных данных в удобный формат.

// 3. getCharacter - метод, который использует getResource для получения информации о конкретном персонаже Marvel по его ID. Затем он использует метод _transformCharacter для преобразования полученных данных в удобный формат.

// Также класс имеет приватные свойства _apiBase и _apiKey, которые хранят базовый URL и ключ API соответственно.

// Метод _transformCharacter преобразует объект персонажа, полученный из API, в объект с полями name, description, thumbnail, homepage и wiki. Эти поля представляют имя персонажа, его описание, ссылку на изображение, домашнюю страницу и страницу википедии соответственно.

// Класс экспортируется по умолчанию для использования в других модулях.