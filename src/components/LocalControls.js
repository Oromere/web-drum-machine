import React from 'react'
import VolumeInput from "./VolumeInput"

export default function LocalControls({onVolumeChange}) {
    return (
        <div className="sound-local-controls">
            <VolumeInput onChange={onVolumeChange}/>
        </div>
    )
}
