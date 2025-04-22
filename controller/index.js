import fs from 'fs';
import path from 'path';

function readfile() {
    const data = JSON.parse(fs.readFileSync(path.join(process.cwd(), '/data/user.json'), 'utf8'));
    return data;
}
function writefile(data) {
    const data2 = fs.writeFileSync(path.join(process.cwd(), '/data/user.json'), JSON.stringify(data, null, 2), 'utf8');
    return data2;
}
const GET = (req, res) => {
    const data = readfile()
    const { sort } = req.query
    if (sort === "firstName") {
        data.sort((a, b) => a.firstName.localeCompare(b.firstName))
    }
    else if (sort === 'lastName') {
        data.sort((a, b) => a.lastName.localeCompare(b.lastName));
    }
    else if (sort === 'course') {
        data.sort((a, b) => a.course - b.course);
    }
    else if (sort === 'faculty') {
        data.sort((a, b) => a.faculty.localeCompare(b.faculty));
    }
    res.status(200).send(data)
}
const GETID = (req, res) => {
    const data = readfile()

}
const POST = (req, res) => {
    let { id } = req.body
    let bodys = req.body
    const data = readfile()
    let finduser = data.find(user => user.id === parseInt(id))
    if (!finduser) {
        let bodyusers = {
            id: data.length ? data[data.length - 1].id + 1 : 1,
            ...bodys
        }
        data.push(bodyusers)
        writefile(data)
    }
    else {
        res.status(400).json({
            message: "post is fails",
            data: req.body
        });
    }
    res.status(200).json({
        message: "POST request received",
        data: req.body
    });
}
const PUT = (req, res) => {
    let { id } = req.params;
    let bodys = req.body;
    const data = readfile();

    const index = data.findIndex(user => user.id === parseInt(id));

    if (index === -1) {
        return res.status(404).json({
            message: "User not found",
            data: req.body
        });
    }

    data[index] = {
        ...data[index],
        ...bodys,
        id: parseInt(id)
    };

    writefile(data);

    res.status(200).json({
        message: "User updated successfully",
        data: data[index]
    });
};
const DELETE = (req, res) => {
    let { id } = req.params

}
export default {
    GET,
    GETID,
    POST,
    PUT,
    DELETE,
}