import React from 'react';
import Coverflow from 'react-coverflow';
import { StyleRoot } from 'radium';

import './ImageSlider.style.scss'


export default class ImageSlider extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            images:this.props.images,
            clicked:false
        }
    }

    componentDidMount() {
        const first = document.getElementsByTagName('img')[2];
        if (first) {
            first.click();
            this.setState({clicked: true})
        }
    }

    componentWillReceiveProps(nextProps, nextContext) {
        this.setState({
            images:nextProps.images,
        });
        const first = document.getElementsByTagName('img')[2];
        if (first && !this.state.clicked){
            first.click();
            this.setState({clicked:true})
        }
    }


    render() {
        let trimmed = [...this.state.images];
        trimmed.shift();
        const images = trimmed.map(item=>
            <img src={item} />
        );

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
                <img src = {this.state.images[0]}/>
                    {images}
                </Coverflow>
        );
    }
}
