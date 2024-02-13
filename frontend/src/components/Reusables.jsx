// This files contains all reusable components

// Search place holder
export function Placeholder({icon, text, placeholderText}) {
    return (
        <label class="relative inline-flex items-center">
            <span class="sr-only">{ text }</span>
            <span class="absolute inset-y-0 left-0 flex items-center pl-2">
                <img src={ icon } class="h-5 w-5 fill-slate-300" viewBox="0 0 20 20" />
            </span>
            <input class="placeholder:italic placeholder:text-slate-400 block bg-white w-full border
            border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500
            focus:ring-sky-500 focus:ring-1 sm:text-sm " required placeholder={ placeholderText } type="text" name="search"/>
        </label>
    )
  }

// Top Resturants
export function TopResturants({image, text}) {
    return (
        <div className="flex flex-col justify-center items-center">
            <div className="w-32 h-32 rounded-e-full">
                <img src={image} alt="Top resturants image" />
            </div>
            <div className="bg-yellow rounded-lg px-6 py-1">
                <p className=" font-medium text-lg">{text}</p>
            </div>
        </div>
    )
}

// Top Cities
export function TopCities({text}) {
    return (
        <div className="  flex items-center justify-center bg-light-yellow rounded-full px-6 py-1 text-center h-12 w-auto">
            <p className=" font-semibold text-lg">{text}</p>
        </div>
    )
}

// Authentication input field
export function AuthenticationInput({type, id, autoComplete, placeholder, value, onChange}) {
    return (
        <div>
            <input
                type={type}
                name={id}
                id={id}
                autoComplete={autoComplete}
                className="block flex-1 border rounded w-full bg-light-yellow py-2 pl-1 placeholder:text-black focus:ring-0 sm:text-sm sm:leading-6 outline-0 hover:border-green invalid:text-red invalid:border-black"
                placeholder={placeholder}
                required
                value={value}
                onChange={onChange}
            />
        </div>
    )
}

// Form input and label
export function FormContent({title, type, id, autoComplete, placeholder, instruction, value, onChange }) {

    return (
        <div className=" flex flex-col justify-center items-start gap-1">
            <label htmlFor={id} className="block text-sm font-medium leading-6 text-black">
                {title}
            </label>
            <input
                type={type}
                name={id}
                id={id}
                autoComplete={autoComplete}
                className="block flex-1 rounded w-full py-2 pl-1 bg-[#d3d3d3] placeholder:text-grey-800 focus:ring-0 sm:text-sm sm:leading-6 outline-0 hover:border-green invalid:text-red"
                placeholder={placeholder}
                required
                value={value}
                onChange={onChange}
            />
            <p className="block text-xs font-normal leading-6 text-black">{instruction}</p>
        </div>
    )
}

// Form with custom background
export function FormContentCustomBg({title, type, id, autoComplete, placeholder, instruction, value, onChange, maxLength }) {

    return (
        <div className=" flex flex-col justify-center items-start gap-1">
            <label htmlFor={id} className="block text-sm font-medium leading-6 text-black">
                {title}
            </label>
            <input
                type={type}
                name={id}
                id={id}
                autoComplete={autoComplete}
                className="block flex-1 rounded w-full py-2 pl-1 bg-light-green border placeholder:text-grey-800 focus:ring-0 sm:text-sm sm:leading-6 outline-0 hover:border-green invalid:text-red"
                placeholder={placeholder}
                required
                value={value}
                onChange={onChange}
                maxLength={maxLength}
            />
            <p className="block text-xs font-normal leading-6 text-black">{instruction}</p>
        </div>
    )
}

// Form input and label
export function FormContentNotRequired({title, type, id, autoComplete, placeholder, instruction, value, onChange }) {

    return (
        <div className=" flex flex-col justify-center items-start gap-1">
            <label htmlFor={id} className="block text-sm font-medium leading-6 text-black">
                {title}
            </label>
            <input
                type={type}
                name={id}
                id={id}
                autoComplete={autoComplete}
                className="block flex-1 rounded w-full bg-light-grey py-2 pl-1 placeholder:text-grey-800 focus:ring-0 sm:text-sm sm:leading-6 outline-0 hover:border-green invalid:text-red"
                placeholder={placeholder}
                value={value}
                onChange={onChange}
            />
            <p className="block text-xs font-normal leading-6 text-black">{instruction}</p>
        </div>
    )
}

export function FormNotes({id, title,instruction, value, onChange}) {
    return (
        <div className=" flex flex-col justify-center items-start gap-1">
            <label htmlFor={id} className=" block text-sm font-medium leading-6 text-black">
            {title}
            </label>
            <div className="mt-1 w-full">
            <textarea
                id={id}
                name={id}
                rows={1}
                className="block rounded w-full bg-light-green border py-2 pl-1 placeholder:text-grey-800 focus:ring-0 sm:text-sm sm:leading-6 outline-0 hover:border-green invalid:text-red"
                placeholder="Example text."
                maxLength={50}
                value={value}
                onChange={onChange}
            />
            </div>
            <p className="block text-xs font-normal leading-6 text-black">{instruction}</p>
        </div>
    )
}

