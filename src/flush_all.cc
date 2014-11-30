#include<node.h>

/* Custom solution until NAN catches up to latest v0.12 */
#if NODE_VERSION_AT_LEAST(0, 11, 15)
static void flush_all(const v8::FunctionCallbackInfo<v8::Value>& args) {
  fflush(NULL);
}
#else
#include <nan.h>

NAN_METHOD(flush_all) {
  fflush(NULL);
  NanReturnUndefined();
}
#endif

void init_flush_all(v8::Handle<v8::Object> exports) {
    NODE_SET_METHOD(exports, "flush_all", flush_all);
}

NODE_MODULE(flush_all, init_flush_all)
