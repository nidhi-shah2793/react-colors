import React from 'react'
import {useParams} from "react-router-dom"

function SingleColorPalette() {
    const {paletteId, colorId} = useParams()
    return (
        <div>
            <h1>Single Color Palette of {colorId}</h1>
        </div>
    )
}

export default SingleColorPalette
