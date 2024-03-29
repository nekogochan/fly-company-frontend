import React from "react";
import {useHistory, useParams} from "react-router-dom";
import {handleApiError} from "src/view/components/apiErrorHandler";
import {useRequest} from "src/model/sendRequest";

export function Page({showDelete = false, showUpdate = false, API, toJsx, url, entityRequest = API.get}) {

    const {id} = useParams();
    const history = useHistory();

    const deleteAction = () => {
        API.delete(id)
            .then(() => {
                history.push(url)
            })
            .catch((error) => {
                handleApiError("Can't delete", error)
            });
    }

    const updateAction = () => {
        history.push(url + "/update/" + id);
    }

    const [entity, pending, error] = useRequest(entityRequest, id);

    if (error) {
        handleApiError("Can't get entity", error);
        return "error";
    }
    if (pending) return "...loading";

    return (
        <div>
            {toJsx(entity)}
            {showDelete && <button className={"red"} onClick={deleteAction}>Delete</button>}
            {showUpdate && <button onClick={updateAction}>Update</button>}
        </div>
    );
}