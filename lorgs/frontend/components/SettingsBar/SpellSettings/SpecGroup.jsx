

import React from 'react'
import { useSelector } from 'react-redux'

import ButtonGroup from '../shared/ButtonGroup.jsx'
import SpellButton from './SpellButton.jsx'
import { get_spec } from '../../../store/specs.js'
import { sort_spell_types } from '../../../store/ui.js'


// spell types that will be combined with the main spec
const COMBINED_TYPES = ["raid", "external", "defensive"]


function SpellTypeGroup({spec, spell_type}) {

    // fetch spells for combined types
    let spells = []
    const all_types = [spell_type, ...COMBINED_TYPES ]
    all_types.forEach(type => {
        const type_spells = spec.spells_by_type[type] || []
        spells = [...spells, ...type_spells]
    })

    // check if there is a dedicated "spec" for the type (eg.: trinkets and potions)
    const type_spec = useSelector(state => get_spec(state, spell_type))
    spec = type_spec || spec
    const extra_class = "wow-" + spec.class.name_slug

    return (
        <ButtonGroup name={spec.name} side="left" extra_class={extra_class}>
            {spells.map(spell_id => <SpellButton key={spell_id} spec={spec} spell_id={spell_id} />)}
        </ButtonGroup>
    )
}


export default function SpecGroup({spec}) {

    if (!spec) { return }

    let spell_types = Object.keys(spec.spells_by_type || {})
    spell_types = sort_spell_types(spell_types)

    // skip combined groups
    spell_types = spell_types.filter(spell_type => !COMBINED_TYPES.includes(spell_type))

    // Render
    return spell_types.map(spell_type =>
        <SpellTypeGroup key={spell_type} spec={spec} spell_type={spell_type} />
    )
}
