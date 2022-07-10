import * as db from './db';
import {AddItemRequest, UpdateItemRequest, Todo, DeleteItemRequest} from './types';
import { Body, Delete, Get, Post, Put, Route, Security, SuccessResponse } from "tsoa";


@Route("/")
export class TodoController {
  /**
   * Get list of all todo items
   */
  @Get("/")
  @Security('bearerAuth')
  public async listItems():Promise<Todo[]> {
    return await db.listItems();
  }

  /**
   * Add new item
   * @param request Provide description for the new Todo
   */
  @Post("/")
  @Security('bearerAuth')
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
  @Security('bearerAuth')
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
  @Security('bearerAuth')
  public async deleteItem(
    @Body() request:DeleteItemRequest
  ) {
    return await db.deleteItem(request.id);
  }
}


