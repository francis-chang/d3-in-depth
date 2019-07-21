import React, { useRef, useEffect } from 'react'
import { select, selectAll } from 'd3-selection'

const App: React.FC = () => {
    const svgSelection = useRef<null | SVGSVGElement>(null)

    useEffect(() => {
        //a ref object
        console.log(svgSelection)
        //the instance of the dom node
        console.log(svgSelection.current)
        //selects the first matching element
        console.log(select(svgSelection.current))
        //similar to document.querySelector
        //returns a wrapper with properties and methods that we can use to modify the dom element
        console.log(select('.foo'), select('#bar'))
        console.log(document.querySelectorAll('.foo'))
        console.log(selectAll('.foo'))
        selectAll('.foo')
            .append('rect')
            .attr('width', 400)
            .attr('height', 300)
            .attr('fill', (what, i) => {
                console.log(what)
                if (i === 0) {
                    return 'blue'
                } else {
                    return 'red'
                }
            })
    }, [svgSelection])
    return (
        <div>
            <svg ref={svgSelection} />
            <svg className="foo" />
            <svg className="foo" />
        </div>
    )
}

export default App
