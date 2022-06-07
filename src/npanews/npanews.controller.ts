import { Controller,Get, Param, Query, Req } from '@nestjs/common';
import { NpanewsService } from './npanews.service'; 
import { Npanews } from './entities/npanews.entity';
@Controller('npa-cms')
export class NpanewsController {
  constructor(private readonly npanewsService: NpanewsService) {}

  @Get('news')
  async getAll(@Query() q ?: {pages:string,limits:string}){
    return await this.npanewsService.getAll(+q.pages,+q.limits)
  }
  
  @Get('news/:npanews_id')
  async getById(@Param('npanews_id') id : number,@Query() q ?: {pages:string,limits:string})
  {
      return await this.npanewsService.getById(id,+q.pages,+q.limits)
  } 
  
  @Get('recommend')
  async getAllRecommended(@Query() q ?: {pages:string,limits:string}){
    return await this.npanewsService.getAllRecommended(+q.pages,+q.limits)
  }
  @Get('recommend/:npanews_id')
  async getRecommendedById(@Param('npanews_id') id : number,@Query() q ?: {pages:string,limits:string})
  {
      return await this.npanewsService.getRecommendedById(id,+q.pages,+q.limits)
  } 
}
