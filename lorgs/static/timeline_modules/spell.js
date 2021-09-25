
import {LINE_HEIGHT} from "./vars.js"


export default class Spell {

    constructor(stage, spell_data) {

        this.stage = stage
        this.data = spell_data

        // alias those attributes for easier access
        this.spell_id = this.data.spell_id;
        this.cooldown = this.data.cooldown || 0;
        this.duration = this.data.duration || 0;
        this.color = this.data.color;
        this.show = this.data.show;
        this.name = this.data.name;

        this.selected = false;

        ////////////////
        // Icon
        this.cast_icon = new Konva.Image({
            name: "icon",
            image: spell_data.button,
            listening: false,
            x: 3.5, // padding
            y: 3.5, // padding
            width: 20,
            height: 20,
            stroke: "black",
            strokeWidth: 1,
            transformsEnabled: "position",
        })
        this.cast_icon.cache()
        this.cast_icon.perfectDrawEnabled(false);

        ////////////////
        // Duration
        this.cast_duration = new Konva.Rect({
            name: "cast_duration",
            width: this.duration * stage.scale_x,
            height: LINE_HEIGHT-1,
            fill: this.color,
            listening: false,
            // cornerRadius: 3,
            opacity: 0.5,
            listening: true,
            transformsEnabled: "none",
        })
        this.cast_duration.perfectDrawEnabled(false);

        ////////////////
        // Cooldown
        this.cast_cooldown = new Konva.Rect({
            name: "cast_cooldown",
            width: this.cooldown * stage.scale_x,
            height: LINE_HEIGHT-1,
            fill: this.color,
            opacity: 0.1,
            listening: false,
            transformsEnabled: "none",
        })
        this.cast_cooldown.perfectDrawEnabled(false);
    }
}
