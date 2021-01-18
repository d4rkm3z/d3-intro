import * as d3 from 'd3';
import * as R from 'ramda';
import { DIMENSIONS } from './dimensions';
import { WeatherData } from 'data/types';
import { CanvasElement, ComparatorsTuple, ScalesTuple } from './types';

export function getAccessors(): ComparatorsTuple {
  const dataParser = d3.timeParse('%Y-%m-%d');

  const xAccessor = (d: WeatherData) => dataParser(d.date);
  const yAccessor = (d: WeatherData) => d.temperatureMax;

  return [xAccessor, yAccessor];
}

export function getScales(dataset: WeatherData[]): ScalesTuple {
  const [xAccessor, yAccessor] = getAccessors();

  const xScale = d3.scaleTime()
    .domain(d3.extent(dataset, xAccessor) as [Date, Date])
    .range([0, DIMENSIONS.boundedWidth]);

  const yScale = d3.scaleLinear()
    .domain(d3.extent(dataset, yAccessor) as [number, number])
    .range([DIMENSIONS.boundedHeight, 0]);

  return [xScale, yScale];
}

export function drawCanvas(element: CanvasElement<HTMLElement>): CanvasElement<SVGGElement> {
  return element.append('svg')
    .attr('width', DIMENSIONS.width)
    .attr('height', DIMENSIONS.height)
    .append('g')
    .style('transform', `translate(
      ${DIMENSIONS.margin.left}px, 
      ${DIMENSIONS.margin.top}px
      )`);
}

export function lineGenerator(dataset: WeatherData[]): string {
  const [xScale, yScale] = getScales(dataset);
  const [xAccessor, yAccessor] = getAccessors();

  const generator = d3.line<WeatherData>()
    .x((d) => xScale(Number(xAccessor(d))))
    .y(d => yScale(yAccessor(d)));

  return R.defaultTo('', generator(dataset));
}

export function drawGraph(
  canvas: CanvasElement<SVGGElement>,
  lineGenerator: string,
): CanvasElement<SVGGElement> {
  canvas.append('path')
    .attr('d', lineGenerator)
    .attr('fill', 'none')
    .attr('stroke', '#af9358')
    .attr('stroke-width', 2);

  return canvas;
}

export function drawFreezingFill(
  canvas: CanvasElement<SVGGElement>,
  [_, yScale]: ScalesTuple
): CanvasElement<SVGGElement> {
  const freezingTemperaturePlacement = yScale(32);

  canvas.append('rect')
    .attr('x', 0)
    .attr('width', DIMENSIONS.boundedWidth)
    .attr('y', freezingTemperaturePlacement)
    .attr('height', DIMENSIONS.boundedHeight - freezingTemperaturePlacement)
    .attr('fill', 'skyblue');

  return canvas;
}

export function drawAxes(
  canvas: CanvasElement<SVGGElement>,
  [xScale, yScale]: ScalesTuple
): CanvasElement<SVGGElement> {
  const yAxisGenerator = d3.axisLeft(yScale);
  const xAxisGenerator = d3.axisBottom(xScale);

  canvas.append('g').call(yAxisGenerator);
  canvas.append('g').call(xAxisGenerator)
    .style('transform', `translateY(${DIMENSIONS.boundedHeight}px)`);

  return canvas;
}