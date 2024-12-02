import { validate } from "class-validator";
import { CreateOrderDto, UpdateOrderDto, UpdateStatusDto } from "../model/order.entity";
import { StatusOrders } from "../model/ordersDto";
import { OrderService } from "../services/orders.service";
import { Request, Response } from "express";
import { NotFoudError } from "../../errors";
import { ObjectId } from "mongodb";
import { plainToInstance } from "class-transformer";
import "reflect-metadata";

export class OrderController {
    orderService = new OrderService()

    async createOrder(req: Request, res: Response) {
        try {
            const createOrderDto = new CreateOrderDto(
                req.body.user,
                req.body.truck,
                StatusOrders.CREATE,
                req.body.pickup,
                req.body.dropoff
            )
            await this.validateDTO(createOrderDto, res)
            const result = await this.orderService.createOrder(createOrderDto)
            res.status(201).json({ message: "se agrego con exito", result })
        } catch (error) {
            console.log(error)
            if (error instanceof NotFoudError) {
                return res.status(404).send({ error: error.message });
            }
            return res.status(500).json({ message: "Ha ocurrido un error inesperado" });
        }
    }

    async listOrders(req: Request, res: Response) {
        try {
            const orders = await this.orderService.listOrders()
            if (orders.length < 0) {
                return res.status(200).json({ message: "no hay ordenes" })
            } else {
                return res.status(200).json({ message: "succes", orders })

            }
        } catch (error) {
            return res.status(500).json({ message: "Ha ocurrido un error inesperado" });
        }
    }
    async updateOrder(req: Request, res: Response) {
        try {
            const updateOrderDto = new UpdateOrderDto(
                req.body._id,
                req.body.user,
                req.body.truck,
                req.body.status,
                req.body.pickup,
                req.body.dropoff
            );

            await this.validateDTO(updateOrderDto, res);

            const order = await this.orderService.updateOrderById(updateOrderDto);

            return res.status(200).json({ message: "Actualizado", order });
        } catch (error) {
            console.error(error);
            if (error instanceof NotFoudError) {
                return res.status(404).send({ error: error.message });
            }
            return res.status(500).json({ message: "Ha ocurrido un error inesperado" });
        }
    }
    async deleteOrder(req: Request, res: Response) {
        try {
            const _id = req.params._id
            if (!_id) {
                return res.status(400).json({ message: "falta mandar el _id" });
            }
            if (!ObjectId.isValid(_id)) {
                return res.status(400).json({ message: "debe de ser un _id valido" });
            }
            await this.orderService.deleteOrder(_id)
            return res.status(200).json({ message: `orden con el id: ${_id}eliminada` })
        } catch (error) {
            if (error instanceof NotFoudError) {
                return res.status(404).send({ error: error.message });
            }
            return res.status(500).json({ message: "Ha ocurrido un error inesperado" });
        }

    }

    async changeStatus(req: Request, res: Response) {
        try {
            const updateStatusDto = new UpdateStatusDto(
                req.body._id,
                req.body.status
            );
            await this.validateDTO(updateStatusDto, res)
            await this.orderService.changeStatus(updateStatusDto)
            return res.status(200).json({ message: "actualizado" })

        } catch (error) {
            console.log(error)
            if (error instanceof NotFoudError) {
                return res.status(404).send({ error: error.message });
            }
            return res.status(500).json({ message: "Ha ocurrido un error inesperado" });
        }
    }

    async validateDTO(dto: any, res: Response) {
        const validateDto = await validate(dto)
        if (validateDto.length > 0) {
            throw res.status(400).json({ message: 'Validation failed', errors: validateDto })
        }
    }
}

