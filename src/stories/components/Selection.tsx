import React, { useEffect, useRef } from 'react'
import { select, selectAll } from 'd3-selection'
const Selection: React.FC = () => {
    const svgSelection = useRef<null | SVGSVGElement>(null)

    useEffect(() => {
        /*
            svgSelection is a ref object
            svgSelection.current is a reference to the DOM node
            select() provides a wrapper around the selected
                element for modifications
        */
        console.log(svgSelection.current)
        console.log(select(svgSelection.current))

        /*
            select() can target W3C selector strings 
                eg select(#id-name) or  select(.class-name)
        */
        console.log(select('.foo'), select('#bar'))

        /*
            select() provides methods and properties
                to help with modifying the selected element
            <svg width={100} height={100} fill="blue"
        */
        select(svgSelection.current)
            .append('rect')
            .attr('width', 100)
            .attr('height', 100)
            .attr('fill', 'blue')

        /*
            selectAll() still returns a selection object 
            but refers to multiple elements
        */
        selectAll('.selectAll')
            .append('rect')
            .attr('width', 100)
            .attr('height', 100)
            .attr('fill', (_, i) => {
                if (i) {
                    return 'orange'
                } else {
                    return 'red'
                }
            })
    })
    return (
        <div>
            <svg ref={svgSelection} />
            <svg className="foo" />
            <svg id="bar" />
            <svg className="selectAll" />
            <svg className="selectAll" />
        </div>
    )
}

export default Selection
