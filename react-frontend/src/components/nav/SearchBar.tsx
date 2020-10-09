import { TextField } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import React from "react";

function SearchBar() {
	return (
		<Autocomplete
			freeSolo
			size="small"
			fullWidth
			disableClearable
			options={[]}
			renderInput={(params) => (
				<TextField
					{...params}
					placeholder="Search"
					label=""
					margin="normal"
					variant="outlined"
					InputProps={{ ...params.InputProps, type: "search" }}
				/>
			)}
		/>
	);
}

export default SearchBar;
