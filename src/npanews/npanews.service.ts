import { Injectable, Param } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { json } from 'stream/consumers';
import { LimitOnUpdateNotSupportedError, Repository } from 'typeorm';
import { Npanews } from './entities/npanews.entity';

@Injectable()
export class NpanewsService {
    constructor(@InjectRepository(Npanews) private readonly npanews : Repository<Npanews>){}

    async getAll(pages ?: number , limits ?: number) : Promise<any>
    {
        const [list, counts] = await this.npanews.findAndCount(
            {
                order : {
                    created_date : 'DESC'
                },
                where:{
                    is_news:true,
                    is_recommended:true,
                    is_active:true,
                    is_approved:true
                },
                skip : (+pages-1)*limits,
                take : +limits
            }
        )
        if(pages && limits)
        {
            return {
                counts,
                pages,
                limits,
                list
            }
        }
        else
        {
            return  {counts,list}
        }
    }
    async getById(id : number,pages ?: number , limits ?: number) : Promise<any>
    {
        const [list, counts] = await this.npanews.findAndCount(
            {
                order : {
                    created_date : 'DESC'
                },
                where:{
                    npanews_id : id,
                    is_news:true,
                    is_recommended:true,
                    is_active:true,
                    is_approved:true,
                },
                skip : (+pages-1)*(+limits),
                take : +limits
            }
        )
        return list['0']
    }

    async getAllRecommended(pages?:number ,limits?:number) : Promise<any>
    {
        const [list, counts] = await this.npanews.findAndCount(
            {
                order : {
                    created_date : 'DESC'
                },
                skip : (+pages-1)*(limits='' ? limits : 4),
                take : +limits
            }
        )
        return  {counts,pages,limits,list}
    }

    async getRecommendedById(id : number,pages ?: number , limits ?: number) : Promise<any>
    {
        const [list, counts] = await this.npanews.findAndCount(
            {
                order : {
                    created_date : 'DESC'
                },
                where:{
                    npanews_id : id,
                    is_news:true,
                    is_recommended:true,
                    is_active:true,
                    is_approved:true,
                    
                },
                skip : (+pages-1)*(+limits),
                take : +limits
            }
        )
        if(pages && limits)
        {
            return {
                counts,
                limits,
                list
            }
        }
        else
        {
            return list['0']
        }
    }
}
