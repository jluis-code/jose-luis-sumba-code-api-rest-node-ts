import { Request } from "express";

export const getFilters = (req: Request) => {

    const { year = -1, coverage = 75, state = 'E' } = req.query;
    const coverage_num: number = +coverage;
    const year_num: number = +year;
    const state_query: string = state as string;

    let year_query = year_num;
    const coverage_query = coverage_num / 100;

    if (year_query == -1) {
        year_query = new Date().getFullYear();
    }

    console.log({ year_query, state, coverage_query });

    return {
        year_query,
        coverage_query,
        state_query
    }

}