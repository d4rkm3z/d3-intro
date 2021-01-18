import React, { useCallback, useEffect, useRef } from 'react';
import * as d3 from 'd3';
import dataset from 'data/nyc_weather_data.json';
import {
  drawAxes,
  drawCanvas,
  drawFreezingFill,
  drawGraph,
  getScales,
  lineGenerator
} from './draw';
import { WeatherData } from 'data/types';
import { CanvasElement, ScalesTuple } from './types';

export default function LinearGraph() {
  const graphRef = useRef<HTMLDivElement>(null);

  const draw = (canvas: CanvasElement<SVGGElement>, scales: ScalesTuple) => {
    drawFreezingFill(canvas, scales);
    drawAxes(canvas, scales);
    drawGraph(canvas, lineGenerator(dataset));
  };

  const onClear = useCallback(() => {
    const canvas = d3.select(graphRef.current);
    canvas.selectAll('svg').remove();
  }, []);

  const onDraw = useCallback(() => {
    onClear();
    if (graphRef.current) {
      const root = d3.select<HTMLElement, WeatherData>(graphRef.current);
      const canvas = drawCanvas(root);
      const scales = getScales(dataset);

      draw(canvas, scales);

      console.log(canvas);
    }
  }, [onClear]);

  useEffect(() => {
    onDraw();
    return () => onClear();
  }, [onClear, onDraw]);


  return (
    <div className="graph" ref={graphRef} />
  );
}