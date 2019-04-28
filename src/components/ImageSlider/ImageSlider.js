import React from 'react';
import Coverflow from 'react-coverflow';
import { StyleRoot } from 'radium';

import './ImageSlider.style.scss'


export default class ImageSlider extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            images:this.props.images,

        }
    }

    componentWillReceiveProps(nextProps, nextContext) {
        this.setState({
            images:nextProps.images,
        })
    }


    eventFire(el, etype){
        if (el.fireEvent) {
            el.fireEvent('on' + etype);
        } else {
            var evObj = document.createEvent('Events');
            evObj.initEvent(etype, true, false);
            el.dispatchEvent(evObj);
        }
    }

    render() {
        let trimmed = [...this.state.images];
        trimmed.shift();
        const images = trimmed.map(item=>
            <img src={item} />
        );
        const first = document.getElementsByTagName('img')[2];
        if (first){
            first.click();
        }
        return (
                <Coverflow
                           displayQuantityOfSide={2}
                           navigation={false}
                           enableScroll={false}
                           clickable={true}
                           enableHeading={false}
                           active={0}
                           media={{
                               '@media (max-width: 900px)': {
                                   width: '600px',
                                   height: '300px'
                               },
                               '@media (min-width: 900px)': {
                                   width: '960px',
                                   height: '400px'
                               }
                           }}
                >
                <img id='1' src = {this.state.images[0]}/>

                    {images}

                </Coverflow>
        );
    }
}
