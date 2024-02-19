import express from 'express'
import NoteModel from '../models/notes'
import createHttpError from 'http-errors'
import mongoose from 'mongoose'


export const getNotes : express.RequestHandler = async (req,res) => {
    try {
        const notes = await NoteModel.find({}).exec()
        res.status(200).json({notes})
    }catch(error) {
        console.log(error)
    }
}

export const getNote : express.RequestHandler = async (req,res,next) => {
    const {id} = req.params
    try {
        if(!mongoose.isValidObjectId(id)) {
            throw createHttpError(400,'Invalid note id')
        }
        const note = await NoteModel.findOne({_id : id})
        if(!note) {
            throw new Error('note not found')
        }
        res.status(200).json({note})
    }catch(error) {
        next(error)
    }
}

interface CreateNoteBody {
    title : string,
    text ?: string
}

export const createNote : express.RequestHandler<CreateNoteBody> = async (req,res,next) => {
    const text = req.body.text 
    const title = req.body.title

    try {
        if(!title) {
            throw createHttpError(400,'Note must have a little')
        }
        const note = await NoteModel.create({text,title})
        res.status(201).json({note})
    }
    catch(error) {
        next(error)
    }
}

interface UpdateNoteParams {
    id: string,
}

interface UpdateNoteBody {
    title?: string,
    text?: string,
}

export const updateNote: express.RequestHandler<UpdateNoteParams, unknown, UpdateNoteBody, unknown> = async (req, res, next) => {
    const id = req.params.id;
    const newTitle = req.body.title;
    const newText = req.body.text;

    try {

        if (!mongoose.isValidObjectId(id)) {
            throw createHttpError(400, "Invalid note id");
        }

        if (!newTitle) {
            throw createHttpError(400, "Note must have a title");
        }

        const note = await NoteModel.findById(id).exec();

        if (!note) {
            throw createHttpError(404, "Note not found");
        }



        note.title = newTitle;
        note.text = newText;

        const updatedNote = await note.save();

        res.status(200).json(updatedNote);
    } catch (error) {
        next(error);
    }
};

export const deleteNote : express.RequestHandler = async (req,res,next) => {

    const id = req.params.id
    try {
        if(!mongoose.isValidObjectId(id)) {
            throw createHttpError(404,'Note not found')
        }
        const note = await NoteModel.findByIdAndDelete(id).exec()

        if(!note) {
            throw createHttpError(404,'Note not found')
        }
        res.status(204).json({message : "note deleted"})
    }catch(error) {
        next(error)
    }
}