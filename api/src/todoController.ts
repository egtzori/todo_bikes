import * as db from './db';
import {AddItemRequest, UpdateItemRequest, Todo, DeleteItemRequest} from './types';
import { Body, Delete, Get, Post, Put, Route, SuccessResponse } from "tsoa";


@Route("/")
export class TodoController {
  /**
   * Get list of all todo items
   */
  @Get("/")
  public async listItems():Promise<Todo[]> {
    return await db.listItems();
  }

  /**
   * Add new item
   * @param request Provide description for the new Todo
   */
  @Post("/")
  @SuccessResponse("201", "Created")
  public async addItem(
    @Body() request:AddItemRequest
  ):Promise<boolean> {
    return await db.addItem(request.description);
  }

  /**
   * Update existing Todo
   * @param request Json object containing id and done
   */
  @Put("/")
  public async updateItem(
    @Body() request:UpdateItemRequest
  ) {
    return await db.updateItem(request.id, request.done);
  }

  /**
   * Update existing Todo
   * @param request Json object with id to delete
   */
  @Delete("/")
  public async deleteItem(
    @Body() request:DeleteItemRequest
  ) {
    return await db.deleteItem(request.id);
  }
}


