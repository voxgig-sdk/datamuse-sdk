package core

type DatamuseError struct {
	IsDatamuseError bool
	Sdk              string
	Code             string
	Msg              string
	Ctx              *Context
	Result           any
	Spec             any
}

func NewDatamuseError(code string, msg string, ctx *Context) *DatamuseError {
	return &DatamuseError{
		IsDatamuseError: true,
		Sdk:              "Datamuse",
		Code:             code,
		Msg:              msg,
		Ctx:              ctx,
	}
}

func (e *DatamuseError) Error() string {
	return e.Msg
}
