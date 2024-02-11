
import { Component } from 'react';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage'
import MarvelService from '../../services/MarvelService';


import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';


class RandomChar extends Component {
    state = {
        char: {},
        loadding: true,
        error: false
    }

    marvelService = new MarvelService();//this.marvelSerice свойство класса теперь
    
    onCharLoaded = (char) => {
        this.setState({char, loadding:false})//char:char записали
    }
    onLoadding = () => {
        this.setState({loadding:true})
    }
    onError = () => {
        this.setState({
            loadding:false,
            error: true
        })
    }

    updateChar = () => {
        const id = Math.floor(Math.random() * (1011400-1011000)+1011000);
        this.onLoadding();
        this.marvelService.getCharacter(id)
        .then(this.onCharLoaded)
        .catch(this.onError)
        
    }
    componentDidMount() {
        this.updateChar();//хорошая практика
    }
    render () {
        const {char, loadding,error} = this.state;//данные
        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loadding ? <Spinner/> : null;
        const content = !(loadding || error) ? <View char={char}/> : null;//если нет загрузки или нет ошибки то вернуть отрисовку всей страницы

        return (
            <div className="randomchar">
                {errorMessage}
                {spinner}
                {content}
                <div className="randomchar__static">
                    <p className="randomchar__title">
                        Random character for today!<br/>
                        Do you want to get to know him better?
                    </p>
                    <p className="randomchar__title">
                        Or choose another one
                    </p>
                    <button className="button button__main" onClick={this.updateChar}>
                        <div className="inner">try it</div>
                    </button>
                    <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
                </div>
            </div>
        )
    }
}

const View = ({char}) => {

    const {name,description,thumbnail,homepage,wiki} = char;
    const unKnowImg = 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg';
    let stylesForImg = {
        objectFit: 'cover'
    }
    if (thumbnail === unKnowImg) {
        stylesForImg = {
            objectFit: 'contain'
        }; 
    }
    
    return(
        <div className="randomchar__block">
            <img src={thumbnail} alt="Random character" className="randomchar__img" style={stylesForImg}/>
            <div className="randomchar__info">
                <p className="randomchar__name">{name}</p>
                <p className="randomchar__descr">
                    {description}
                </p>
                <div className="randomchar__btns">
                    <a href={homepage} className="button button__main">
                        <div className="inner">homepage</div>
                    </a>
                    <a href={wiki} className="button button__secondary">
                        <div className="inner">Wiki</div>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default RandomChar;