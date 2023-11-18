import React from 'react'

export default function CreateOkr() {
  return (
    <form onSubmit={handleSubmit} className={`w-full h-full`}>
      <h1 className="font-bold text-2xl mb-4">Crie seu link de convite!</h1>
      <div className="mb-5">  
        <label className="block font-medium text-lg mb-2" htmlFor="name">
          Nome do link
        </label>
        <Input
          ClassName=""
          type="text"
          id="name"
          name="name"
          placeholder="Nome"
          value={formData.name}
          onChange={handleChange}
        />
      </div>
      <div className="mb-5">
        <label className="block font-medium text-lg mb-2" htmlFor="type">
          Nível de Acesso
        </label>
        <Select
          options={rolesList}
          id="targetRole"
          selected={formData.targetRole}
          handleselected={handleChange}
          name="targetRole"
          ClassName="p-3"
        />
      </div>
      <div className="flex justify-between">
        <Button
          ClassName="px-4 py-2 rounded-md"
          type="submit"
          text={"Salvar"}
          textClassName="px-4 py-2 font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#0085FF] to-[#1400FF] dark:bg-gradient-to-r dark:from-[#00F0FF] dark:to-[#00A5BC]"
        ></Button>
        <Button
          ClassName="px-4 py-2 rounded-md"
          onClick={onCancel}
          text="Cancelar"
          textClassName="font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#ff0000] to-[#ff5252] dark:bg-gradient-to-r dark:from-[#ff0000] dark:to-[#ff5252]"
        ></Button>
      </div>
    </form>
  )
  )
}
