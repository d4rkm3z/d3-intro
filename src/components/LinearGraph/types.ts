import { BaseType } from 'd3-selection';
import { ScaleLinear, ScaleTime, Selection } from 'd3';
import { WeatherData } from 'data/types';

export type CanvasElement<T extends BaseType> = Selection<T, WeatherData, null, undefined>;
export type ScalesTuple = [ScaleTime<number, number>, ScaleLinear<number, number>];
export type ComparatorsTuple = [Accessor<Date | null>, Accessor<number>]

export type Accessor<T> = (prop: WeatherData) => T
