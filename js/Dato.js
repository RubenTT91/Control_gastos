class Dato{
    constructor(descripcion, valor){
        this._descripcion = descripcion;
        this._valor = valor;
    }
    get descripcion(){
        return this._descripcion;
    }
    set nuevaDescripcion(descripcion){
        this._descripcion = descripcion;
    }
    get valor(){
        return this._valor;
    }
    set nuevoValor(valor){
        this._valor = valor;
    }
}