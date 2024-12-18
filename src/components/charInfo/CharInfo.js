import {useState, useEffect} from 'react';
import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Skeleton from '../skeleton/Skeleton';
import { PropTypes } from 'prop-types';
import './charInfo.scss';

const CharInfo = (props) => {
    // state = {
    //     char: null,
    //     loadding: false,
    //     error: false,
    // }

    const [char, setChar] = useState(null);

    const {loadding, error, getCharacter, clearError} = useMarvelService();//this.marvelSerice свойство класса теперь
    
    useEffect(()=> {
        updateChar();
    },[props.charId]);

    // componentDidUpdate(preProps, prevState) {//предыдущие состояния и предыдущие пропсы
    //     if (this.props.charId !== preProps.charId) {
    //         this.updateChar();
    //     }
    // }

    const updateChar = () => {
        clearError();
        const {charId} = props;
        if (!charId) {
            return;
        }
        getCharacter(charId)
        .then(onCharLoaded);
    }
    const onCharLoaded = (char) => {
        // this.setState({char, loadding:false})//char:char записали
        setChar(char);
    }
   


        const skeleton = char || loadding || error ? null : <Skeleton/>; 
        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loadding ? <Spinner/> : null;
        const content = !(loadding || error || !char) ? <View char={char}/> : null;//если нет загрузки или нет ошибки то вернуть отрисовку всей страницы
        return (
            <div className="char__info">
                {skeleton}
                {errorMessage}
                {spinner}
                {content}
            </div>
        )
}

const View = ({char}) => {
    
    const {name, description, thumbnail, homepage, wiki, comics} = char;
    let stylesForImg = {
        objectFit: 'cover'
    }
    if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {stylesForImg = {objectFit: 'contain'}; } 
    
    return(
        <>
            <div className="char__basics">
                        <img src={thumbnail} alt={name} style={stylesForImg}/>
                        <div>
                            <div className="char__info-name">{name}</div>
                            <div className="char__btns">
                                <a href={homepage} className="button button__main">
                                    <div className="inner">homepage</div>
                                </a>
                                <a href={wiki} className="button button__secondary">
                                    <div className="inner">Wiki</div>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="char__descr">
                        {description}
                    </div>
                    <div className="char__comics">Comics:</div>
                    <ul className="char__comics-list">
                        {comics.length> 0 ? null : "There are no comics with this character"}
                        {
                            comics.map((item, i)=>{
                                if (i>9) return;//ограничили количество комиксов
                                
                                return (
                                    <li className="char__comics-item" key={i}>
                                        {item.name}
                                    </li>
                                )
                            })
                        }
                    </ul>
        </>
    )
}

CharInfo.propTypes = {
    charId: PropTypes.number
}
CharInfo.defaultProps = {
    charId: 1011196
}

export default CharInfo;