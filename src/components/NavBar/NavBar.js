import React, { Component } from 'react';
import "./NavBar.style.scss";
import { Input } from 'semantic-ui-react'
import dog from '../../assets/dog.png';
import cat from '../../assets/cat.png';
import {animateScroll as scroll } from 'react-scroll';
import {Redirect} from 'react-router-dom'


/**
 * Navigation bar for the whole site with complex scroll effect.
 * Use expanded = {true} for the main page
 * Use expanded = {false} for sub pages.
 */
export default class NavBar extends Component{
    constructor(props){
        super(props);
        this.state = {
            expanded:this.props.expanded,
            scroll:0,
            searchQuery: '',
            isSearching: false,
        };

        this.handleScroll = this.handleScroll.bind(this);
        this.focusHandler = this.focusHandler.bind(this);
        this.searchFieldOnChange = this.searchFieldOnChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);

        try {
            let thisQuery = this.props.searchQuery;
            if (thisQuery !== undefined) {
                this.setState({searchQuery: thisQuery});
            }
        } catch {}

    }



    componentWillReceiveProps(nextProps, nextContext) {
        console.log('here!!!!!!!!');
        try {
            let thisQuery = nextProps.searchQuery;
            if (thisQuery !== undefined && thisQuery !== this.state.searchQuery) {
                this.setState({searchQuery: thisQuery});
            }
        } catch (e) {
            console.log(e);
        }

    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }

    handleScroll(){
        let position = window.pageYOffset;
        this.setState({scroll:position});
    }

    focusHandler(){
        scroll.scrollTo(550);
    }

    searchFieldOnChange(val) {
        this.setState({searchQuery: val.target.value});
    }

    handleSubmit(e) {
        e.preventDefault();
        this.setState({isSearching: true});
    }

    render() {
        if (this.state.isSearching) {
            let newRoute = '/search?text=' + this.state.searchQuery;
            if (this.state.searchQuery==='') {
                newRoute = '';
            }
            this.setState({isSearching: false});
            return <Redirect to={newRoute}/>
        }
        const position = this.state.scroll;
        const top = 500+position/11;
        const topStr = (position<=550)?(top+'px'):'550px';
        const opacity = (500-position)/500;
        const navOpacity = (400-position>=0)?0:(position-400)/100;
        if (this.state.expanded){
            return (
                <div className={position<=540?'nav-expanded':'nav-minimized'}>
                    <div
                        className='nav-item-left disable-select'
                        style={{opacity:navOpacity}}
                        onClick={()=>{
                            window.location.replace('/');
                        }}>
                        Pet Gallery
                    </div>
                    <div className='title disable-select' style={{opacity:opacity}}>
                        <img className='icon-cat' src={cat}/>
                        Pet Gallery
                        <img className='icon-dog' src={dog}/>
                    </div>
                    <div className='nav-item-right disable-select' style={{opacity:navOpacity}}>Log in</div>
                    <form onSubmit={this.handleSubmit}>
                        <Input
                            className='search'
                            style={{top:topStr}}
                            fluid={true}
                            icon='search'
                            placeholder='Search...'
                            onFocus={this.focusHandler}
                            onChange={this.searchFieldOnChange}
                            value={this.state.searchQuery}

                        />
                    </form>
                </div>
            )
        }
        else{
            return (
                <div className={'nav-minimized'}>
                    <div className='nav-item-left' style={{opacity:1}} onClick={()=>{
                        window.location.replace('/');
                    }}>Pet Gallery</div>
                    <form onSubmit={this.handleSubmit}>
                        <Input
                            className='search'
                            style={{top:'550px'}}
                            fluid={true}
                            icon='search'
                            placeholder='Search...'
                            onChange={this.searchFieldOnChange}
                            value={this.state.searchQuery}
                        />
                    </form>
                    <div className='nav-item-right' style={{opacity:1}}>Log in</div>
                </div>
            )
        }

    }
}
