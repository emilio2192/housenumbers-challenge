import { Schema, model } from "mongoose";
import { Snippet } from "../types/snippet";

interface ISnippetDocument extends Snippet, Document {}

const SnippetSchema = new Schema<ISnippetDocument>({
    text: {
        type: String,
        required: [true, "Text is required"],
        minlength: [30, "Text must be at least 30 characters long"],
        trim: true,
    },
    summary: {
        type: String,
        required: [true, "Summary is required"],
        trim: true,
    }
},{
    timestamps: true
})

export default model<ISnippetDocument>("Snippet", SnippetSchema);