export function handleServerError(
  req,
  err,
  res,
  message = `An unknown error occurred`
) {
  res.status(500).json({
    status: `ERROR`,
    message,
  });
}

export function handleForbiddenError(
  res,
  message = `You are not allowed to make this request`
) {
  res.status(403).json({
    status: `FORBIDDEN`,
    message,
  });
}
