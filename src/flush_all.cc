#include <nan.h>

NAN_METHOD(flush_all) {
  fflush(NULL);
  NanReturnUndefined();
}

void init_flush_all(v8::Handle<v8::Object> exports) {
  NODE_SET_METHOD(exports, "flush_all", flush_all);
}

NODE_MODULE(flush_all, init_flush_all)
