import { renderData, setActiveTab } from './render.js';
import { data } from '../main.js';

export const fetchingFunction = async () => {
  try {
    const res = await fetch('./src/data/data.json');
    if (!res.ok) throw new Error(`Failed to load JSON: ${res.status}`);

    const json = await res.json();
    data.length = 0;
    data.push(...json);

    renderData('daily'); // default view
    setActiveTab('daily');
  } catch (err) {
    console.error('Error loading JSON:', err);
  }
};
