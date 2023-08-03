import React, { Component } from 'react';

class ImagePixelCheckComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            imageLoaded: false,
            pixelCoordinates: [
                { x: 100, y: 100 },
                { x: 150, y: 200 },
                // ... Add more pixel coordinates
            ],
            pixelResults: [],
        };

        this.imageRef = React.createRef();
    }

    componentDidMount() {
        this.loadImage();
    }

    loadImage() {
        const image = new Image();
        image.src = '/path/to/your/image.png'; // Replace with your image path

        image.onload = () => {
            this.imageRef.current.width = image.width;
            this.imageRef.current.height = image.height;

            this.setState({
                imageLoaded: true,
            });

            this.checkPixelCoordinates(image);
        };
    }

    checkPixelCoordinates(image) {
        const { pixelCoordinates } = this.state;
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');

        canvas.width = image.width;
        canvas.height = image.height;

        context.drawImage(image, 0, 0, image.width, image.height);

        const pixelResults = pixelCoordinates.map((coord) => {
            const pixelData = context.getImageData(coord.x, coord.y, 1, 1).data;
            const isColoredPixel = pixelData[3] !== 0; // Check if alpha value is not 0

            return {
                ...coord,
                isColoredPixel,
            };
        });

        this.setState({
            pixelResults,
        });
    }

    render() {
        const { imageLoaded, pixelResults } = this.state;

        return (
            <div>
                <h1>Image Pixel Check</h1>
                {imageLoaded ? (
                    <div>
                        <div>
                            <img
                                ref={this.imageRef}
                                src="/path/to/your/image.png"
                                alt="Target Image"
                            />
                        </div>
                        <div>
                            <h2>Pixel Results</h2>
                            <ul>
                                {pixelResults.map((result, index) => (
                                    <li key={index}>
                                        {`Pixel (${result.x}, ${result.y}): ${
                                            result.isColoredPixel ? 'Colored' : 'Transparent'
                                        }`}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                ) : (
                    <p>Loading image...</p>
                )}
            </div>
        );
    }
}

export default ImagePixelCheckComponent;