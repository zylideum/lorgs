import React from 'react'
import data_store from '../../../data_store.js'
import FilterButton from '../shared/FilterButton.jsx'


export default function FilterCovenant({covenant}) {

    const covenant_slug = covenant.toLowerCase()

    function onClick({value}) {

        data_store.dispatch({
            type: "update_filter",
            field: covenant_slug,
            value: !value
        })
    }

    return (
        <FilterButton
            key={covenant_slug}
            onClick={onClick}
            name={covenant_slug}
            full_name={covenant}
            icon_name={`covenants/${covenant_slug}`}
        />
    )
}
