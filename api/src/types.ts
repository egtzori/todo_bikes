/**
 * Main Todo type
 */
type Todo = {
  /**
   * number id, auto generated on creation
   */
  id:number;
  /**
   * Description text for this Todo
   */
  description:string;
  /**
   * Flag id this Todo is done
   */
  done:boolean;
};


// request types for controller
type AddItemRequest = Pick<Todo, "description">;
type UpdateItemRequest = Pick<Todo, "id" | "done">;
type DeleteItemRequest = Pick<Todo, "id">;

export {
  Todo,
  AddItemRequest,
  UpdateItemRequest,
  DeleteItemRequest
};
