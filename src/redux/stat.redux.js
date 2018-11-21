
const ADD_STAT_EVENT="ADD_STAT_EVENT"


export function  stat( state,action){
    switch (action.type) {
        case ADD_STAT_EVENT:
        {
           
            return state+1
        }
      
        default:
            return 1;
    }

}

export function addStatEvent(payload){
    return {type:ADD_STAT_EVENT,payload}
}