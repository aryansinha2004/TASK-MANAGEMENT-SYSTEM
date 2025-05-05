import mongoose, { Schema } from "mongoose";

const memberSchema = mongoose.Schema({
    name: {
        type: Schema.Types.String,
        required: true
    },
    image: {
        type: Schema.Types.String,
    },
    company:{
        type: Schema.Types.String,
        required: true
    },
    email: {
        type: Schema.Types.String,
        required: true
    },
    phone: {
        type: Schema.Types.Number,
        required: true
    },
    position: {
        type: Schema.Types.String,
        required: true
    },
    password: {
        type: String,
        required: false
    }
});

const Member = mongoose.model("member", memberSchema);

export default Member;