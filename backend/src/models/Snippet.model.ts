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
    timestamps: true,
    toJSON: {
        virtuals: true,
        transform: function(doc, ret) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
            return ret;
        }
    },
    toObject: {
        virtuals: true,
        transform: function(doc, ret) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
            return ret;
        }
    }
})

export default model<ISnippetDocument>("Snippet", SnippetSchema);