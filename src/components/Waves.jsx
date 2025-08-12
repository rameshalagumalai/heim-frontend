import { useState } from "react";
import DeleteWaveModal from "../modals/DeleteWaveModal";
import Wave from "./Wave";

export default function Waves({ waves, setWaves }) {

    const [deleteWaveId, setDeleteWaveId] = useState(0);

    return (
        <div>
            {
                waves.map((wave, i) => {
                    return <Wave key={i} wave={wave} commentsCount={wave.comments_count} detailed={false} setDeleteWaveId={setDeleteWaveId} />
                })
            }
            <DeleteWaveModal waveId={deleteWaveId} waves={waves} setWaves={setWaves} detailed={false} />
        </div>
    );
}