import {EPeriods} from "../constants/transaction.constants";
import moment from "moment";

export const getDateFromPeriod = (period: EPeriods) => {
    switch (period) {
        case EPeriods.Day:
            return moment().subtract('1', 'day')
        case EPeriods.Week:
            return moment().subtract('1', 'week')
        case EPeriods.Month:
            return moment().subtract('1', 'month')
        case EPeriods.Year:
            return moment().subtract('1', 'year')
    }
}