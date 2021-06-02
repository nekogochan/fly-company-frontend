import React from "react";
import {useRequest} from "src/model/sendRequest";
import {handleApiError} from "src/view/components/apiErrorHandler";

export function List({supplier, toJsx}) {

    const [entities, pending, error] = useRequest(supplier);

    if (error) handleApiError("Can't get list", error);
    if (pending) return "...loading";

    return entities.length === 0
           ? "empty set"
           : entities.map(toJsx);
}
